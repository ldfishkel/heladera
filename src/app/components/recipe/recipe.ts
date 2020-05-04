import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatSelectionList } from '@angular/material'

@Component({
    selector: 'recipes',
    templateUrl : '../../views/recipe.html',
    styleUrls : ['../../styles/app.css']
})
export class RecipeComponent implements OnInit
{
    id: string
    recipes : any[]
    all = []

    selected : any

    @ViewChild("foods", { static: true })
    foods : MatSelectionList

    constructor (private _route: ActivatedRoute) 
    {
        this.id = _route.snapshot.params['id']
    }

    ngOnInit() : void 
    {
        let recipes = localStorage.getItem("recipes")

        if (recipes)
            this.recipes = JSON.parse(recipes)

        this.selected = this.recipes.find(recipe => btoa(recipe.name).replace(/[^\w\s]/gi, '') == this.id)

        let todo = JSON.parse(localStorage.getItem("todo"))
        let done = JSON.parse(localStorage.getItem("done"))
        this.all = todo.concat(done) 
    }

    addOption() : void 
    {
        let option = []
        
        this.foods.selectedOptions.selected.forEach(e => option.push(e.value))


        this.selected.options.push(option)

        localStorage.setItem("recipes", JSON.stringify(this.recipes))

        this.foods.deselectAll()
    }
}