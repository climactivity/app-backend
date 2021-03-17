import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    @Render('index')
    root() {
        return {message: 'It works!'}
    }
    @Get('admin')
    @Render('index')
    dashboard() {
        return {message: "You're in!"}
    }
}