import React, { Suspense } from 'react'
import classes from './page.module.css';
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse through the delicious meals shared by our vibrant community.',
};


async function Meals(){
  const meals = await getMeals();
  return <MealsGrid meals={meals}/>;
}

const MealsPage = () => {


  return (
    <>
      <header className={classes.header}>
        <h1>Delicuius meals, created {' '} 
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It's easy and fun!</p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fething items...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default MealsPage