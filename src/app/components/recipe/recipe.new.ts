import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSelectionList } from '@angular/material'

@Component({
    selector: 'new-recipe',
    templateUrl : '../../views/recipe.new.html',
    styleUrls : ['../../styles/app.css']
})
export class NewRecipeSheet implements OnInit
{
    all = []
    recipes = []

    constructor(private bottomSheetRef: MatBottomSheetRef<NewRecipeSheet>, 
                @Inject(MAT_BOTTOM_SHEET_DATA) 
                public data: any) {}

    @ViewChild("foods", {static: true})
    foods : MatSelectionList

    @ViewChild("name", {static: true})
    name : ElementRef

    create() : void
    {
        let recipes = localStorage.getItem("recipes")

        if (recipes)
            this.recipes = JSON.parse(recipes)

        let option = []
        
        this.foods.selectedOptions.selected.forEach(e => option.push(e.value))

        this.recipes.push({ 
            name: this.name.nativeElement.value, 
            options : [ option ]
        })

        localStorage.setItem("recipes", JSON.stringify(this.recipes))

        this.bottomSheetRef.dismiss()
    }

    ngOnInit(): void 
    {
        let todo = JSON.parse(localStorage.getItem("todo"))
        let done = JSON.parse(localStorage.getItem("done"))
        this.all = todo.concat(done) 
    }

    dismiss(event: MouseEvent) : void 
    {
        this.bottomSheetRef.dismiss()
        event.preventDefault()
    }
}