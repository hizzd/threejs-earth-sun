import {App} from "./core/app";
import {Space} from "./scene/space";

const app = new App();
app.preload();
window.onload = () => {
    app.changeScene(new Space());
    app.create();
    update();
};

let lastUpdateTime = 0;

function update() {
    requestAnimationFrame(update);
    const now = window.performance.now();
    app.update(now - lastUpdateTime);
    lastUpdateTime = now;
}

