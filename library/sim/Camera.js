Sim.Camera = {};

Sim.Camera.cameraToWorld = function(camera) {
    var horizon = Sim.Config.camera.horizon,
        A = Sim.Config.camera.A,
        B = Sim.Config.camera.B,
        C = Sim.Config.camera.C,
        width = Sim.Config.camera.width;

    var pixelVerticalCoordinate = camera.y - horizon;
    var pixelRight = camera.x - width/2;
    return {
        y: B + A / pixelVerticalCoordinate,
        x: C * pixelRight / pixelVerticalCoordinate
    };
};

Sim.Camera.worldToCamera = function(world) {
    var horizon = Sim.Config.camera.horizon,
        A = Sim.Config.camera.A,
        B = Sim.Config.camera.B,
        C = Sim.Config.camera.C,
        width = Sim.Config.camera.width;

    var pixelVerticalCoordinate = A / (world.y - B);
    var pixelRight = world.x * pixelVerticalCoordinate / C;
    return {
        y: pixelVerticalCoordinate + horizon,
        x: pixelRight + width / 2
    };
};