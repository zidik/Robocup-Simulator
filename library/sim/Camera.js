Sim.Camera = {};

Sim.Camera.cameraToWorld = function(camera) {
    //Calibration constants
    var horizon = Sim.Config.camera.horizon,
        A = Sim.Config.camera.A,
        B = Sim.Config.camera.B,
        C = Sim.Config.camera.C,
        width = Sim.Config.camera.width;

    //Number of pixels from the horizon
    var pixelVerticalCoordinate = camera.y - horizon;
    // Number pixels to the left from the centerline (negative represents pixels to right)
    var pixelLeft = width/2 - camera.x;
    // x - meters forward
    // y - meters to the left
    return {
        x: B + A / pixelVerticalCoordinate,
        y: C * pixelLeft / pixelVerticalCoordinate
    };
};

Sim.Camera.worldToCamera = function(world) {
    var horizon = Sim.Config.camera.horizon,
        A = Sim.Config.camera.A,
        B = Sim.Config.camera.B,
        C = Sim.Config.camera.C,
        width = Sim.Config.camera.width;

    var pixelVerticalCoordinate = A / (world.x - B);
    var pixelLeft = world.y * pixelVerticalCoordinate / C;
    return new Sim.Camera.Pixel(pixelVerticalCoordinate + horizon, width / 2 - pixelLeft);
};

Sim.Camera.Pixel = function(x, y) {
    this.x = x;
    this.y = y;
};