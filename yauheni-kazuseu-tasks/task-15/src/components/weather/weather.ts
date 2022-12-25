// function sealed(constructor: Function) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
// }

// @sealed
// experimental not worked
export abstract class Weather {
    abstract WEATHER: HTMLElement;
    abstract getWeatherData(): void;
    abstract addWeather(weather: string | any[]): void;
}