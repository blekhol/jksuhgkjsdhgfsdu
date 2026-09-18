import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import fs from "node:fs"
import { Criminal } from './Criminal.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get("piros-kek")
  @Render("red-blue")
  getPirosKek() {
    return {
      szin : Math.floor(Math.random() * 2) ? "#ff0000" : "#0000ff"
    }
  }

  @Render("wanted")
  @Get("wanted")
  getWanted() {
    const criminal = JSON.parse(
      fs.readFileSync("wanted.json", {encoding: "utf-8"})
    ) as Criminal;
    return { criminal };
  }

  @Render("search")
  @Get("search")
  searchCrime(@Query("keresett") keresett: string) {
    if (!keresett) {
      return {
        talalatok : []
      }
    }
    
    const criminal = JSON.parse(
      fs.readFileSync("wanted.json", {encoding: "utf-8"})
    ) as Criminal;
    
    return {
      talalatok: criminal.crimes.filter(c => c.toLocaleLowerCase().includes(keresett.toLocaleLowerCase()))
    }
  }

  @Render("color-picker")
  @Get("color-picker")
  colorPicker(@Query("color") color: string) {
    return {
      color: color
    }
  }

  @Render("quadratic")
  @Get("quadratic")
  quadratic(@Query("a") a: number, @Query("b") b: number, @Query("c") c: number) {
    const x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    const x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

    

    return {
      x1: x1,
      x2: x2
    }
  }
}
