import { Component, OnInit, Inject } from '@angular/core'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material'

@Component({
    selector: 'recipes',
    templateUrl : '../../views/recipes.html',
    styleUrls : ['../../styles/app.css']
})
export class RecipesSheet implements OnInit
{
    recipes = []

    showing = []

    selected : any

    constructor(private bottomSheetRef: MatBottomSheetRef<RecipesSheet>, 
                @Inject(MAT_BOTTOM_SHEET_DATA) 
                public data: any) {}

    ngOnInit(): void 
    {
        let recipes = localStorage.getItem("recipes")

        if (recipes)
            this.recipes = JSON.parse(recipes)

        this.recipes.forEach(recipe => 
        {
            if(recipe.options.some(o => o.every(i =>  this.data.having.includes(i))))
                this.showing.push(recipe)
        })
    }

    getHash(name) : string
    {
        return btoa(name).replace(/[^\w\s]/gi, '')
    }

    dismiss(event: MouseEvent): void 
    {
        this.bottomSheetRef.dismiss({selected: this.selected})
        
        if (event)
            event.preventDefault()
    }
}