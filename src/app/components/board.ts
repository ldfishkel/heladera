import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators'
import { MatBottomSheet } from '@angular/material';
import { NewRecipeSheet } from './recipe/recipe.new';
import { RecipesSheet } from './recipe/recipe.all';

@Component({
    selector: 'board',
    templateUrl: '../views/board.html',
    styleUrls: ['../styles/app.css']
})
export class BoardComponent implements OnInit
{

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches))
    
    myInnerHeight : number

    todo = []

    done = []

    doneDisplay : string = 'block'

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