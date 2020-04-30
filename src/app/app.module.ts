import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MatBottomSheetModule, MatSnackBarModule, MatFormFieldModule, MatListModule } from '@angular/material'
import { AppComponent, RecipesSheet, NewRecipeSheet } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule(
{
    declarations:
    [
        AppComponent,
        RecipesSheet,
        NewRecipeSheet,
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
        HttpClientModule,
        LayoutModule
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
