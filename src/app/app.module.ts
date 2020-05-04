import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MatBottomSheetModule, MatSnackBarModule, MatFormFieldModule, MatListModule, MatExpansionModule } from '@angular/material'
import { AppComponent } from './components/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { RecipesSheet } from './components/recipe/recipe.all';
import { NewRecipeSheet } from './components/recipe/recipe.new';
import { RecipeComponent } from './components/recipe/recipe';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board';

const routes: Routes = [

    { path: '',  component: BoardComponent },

    { path: 'recipe/:id', component: RecipeComponent },

    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule(
{
    declarations:
    [
        AppComponent,
        BoardComponent,
        RecipesSheet,
        NewRecipeSheet,
        RecipeComponent
    ],

    imports: 
    [
        BrowserModule,
        BrowserAnimationsModule,

        DragDropModule,
        MatBottomSheetModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatListModule,
        MatExpansionModule,
        HttpClientModule,

        LayoutModule,
        RouterModule.forRoot(routes)

    ],

    providers: [],
    entryComponents : 
    [ 
        RecipesSheet,
        NewRecipeSheet
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
