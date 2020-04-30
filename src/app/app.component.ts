import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatSelectionList } from '@angular/material';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches))
    
    myInnerHeight : number

    todo = []

    done = []

    constructor(private http: HttpClient,
                private bottomSheet: MatBottomSheet,
                private breakpointObserver: BreakpointObserver) { }

    drop(event: CdkDragDrop<string[]>) : void
    {
        if (event.previousContainer === event.container) 
        {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
        } 
        else 
        {
            transferArrayItem(event.previousContainer.data,
                                event.container.data,
                                event.previousIndex,
                                event.currentIndex)
        }

        localStorage.setItem("todo", JSON.stringify(this.todo))
        localStorage.setItem("done", JSON.stringify(this.done))
    }

    ngOnInit() : void 
    {
        this.myInnerHeight = window.innerHeight - 40

        let todo = localStorage.getItem("todo")
        let done = localStorage.getItem("done")

        if (!todo && !done)
            this.http.get('assets/data/alimentos.json')
                .subscribe((data : any[]) => 
                    data.forEach(e => this.done.push(e.name)))
        else
        {
            this.todo = JSON.parse(todo)
            this.done = JSON.parse(done)
        }
    }

    openRecipes() : void
    {
        this.bottomSheet.open(RecipesSheet, { data : { having : this.todo, } })
    }

    create() : void
    {
        this.bottomSheet.open(NewRecipeSheet, { })
    }
}

function delay(ms: number) 
{
    return new Promise(resolve => setTimeout(resolve, ms))
}

@Component({
    selector: 'recipes',
    templateUrl : './recipes.html',
    styleUrls : ['./app.component.css']
})
export class RecipesSheet implements OnInit
{
    recipes = [
        { 
            name: "harina y (alcachofa o brócoli)", 
            options : [
                [ "harina", "alcachofa"],
                [ "harina", "brócoli"]
            ]
        },
        { 
            name: "cerezas y (champiñon o garvanzos)", 
            options : [
                [ "cerezas", "champiñón"],
                [ "cerezas", "garbanzos"]
            ]
        },
        { 
            name: "lima o cerezas", 
            options : [
                [ "lima"],
                [ "cerezas"]
            ]
        }
    ]

    showing = []

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

    dismiss(event: MouseEvent): void 
    {
        this.bottomSheetRef.dismiss()
        event.preventDefault()
    }
}

@Component({
    selector: 'new-recipe',
    templateUrl : './new.recipe.html',
    styleUrls : ['./app.component.css']
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


    create()
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

