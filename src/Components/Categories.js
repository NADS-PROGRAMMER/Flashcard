import React from 'react'
import Button from './Button'

function Categories({categories}) {
    // flex flex-wrap gap-4 items-stretch
    return (
        <div className="flex flex-wrap gap-4 items-stretch px-1 md:px-8">

            {categories.map(category => {

                return (
                    <section key={category.id} className="flex flex-col jusitfy-around  gap-3 bg-green-100 py-5 px-3 hover:scale-150 border-2 border-green-900 max-w-sm w-full">
                        <section>
                            <h1 className="text-2xl font-medium">{category['category']}</h1>
                            <p className="font-semibold text-blue-900">{category['description']}</p>
                        </section>
                        
                        <section className="flex gap-3">
                            <Button className="bg-green-300 font-bold py-2 px-2 hover:bg-green-400 shadow w-30" text="Add Question"/>
                            <Button className="bg-red-300 font-bold py-2 px-3 hover:bg-red-400 shadow" text="Delete"/>
                        </section>
                     </section>
                )
            })}
            
        </div>
    )
}

export default Categories
