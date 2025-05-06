import fs from 'node:fs';

import cloudinary from '../lib/cloudinary';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

// export async function saveMeal(meal){
//     meal.slug = slugify(meal.title, {lower: true});
//     meal.instructions = xss(meal.instructions);

//     const extension = meal.image.name.split('.').pop();
//     const fileName = `${meal.slug}.${extension}`;

//     const stream = fs.createWriteStream(`public/images/${fileName}`);
//     const bufferedImage = await meal.image.arrayBuffer();

//     stream.write(Buffer.from(bufferedImage), (error) => {
//         if (error) {
//             throw new Error('Saving image failed.');
//         }

//     });

//     meal.image = `/images/${fileName}`;

//     db.prepare(`
//         INSERT INTO meals
//             (slug, title, summary, instructions, creator, creator_email, image)
//         VALUES (
//             @slug,
//             @title,
//             @summary,
//             @instructions,
//             @creator,
//             @creator_email,
//             @image
//         )
//     `).run(meal);
// }



export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
  
    const buffer = Buffer.from(await meal.image.arrayBuffer());
  
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'meals',
          public_id: meal.slug,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });
  
    meal.image = uploadResult.secure_url;
  
    db.prepare(`
      INSERT INTO meals
        (slug, title, summary, instructions, creator, creator_email, image)
      VALUES (
        @slug,
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image
      )
    `).run(meal);
  }