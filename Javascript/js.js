// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common;

    var images = [
    "../Images/pizza.png",
    "../Images/saucisse.png"
  
];
// create an engine
//ar engine = Engine.create(),
    

// create a renderer
//var render = Render.create({
  //  element: document.body,
    // engine: engine
// });
const canvas = document.getElementById("matter-canvas");

const engine = Matter.Engine.create();
const render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent"   // obligatoire si tu veux voir ton HTML !
    }
});
world = engine.world;
  // add bodies
var stack = Composites.stack(0, 20, 20, 5, 0, 0, function(x, y) {
    x = Common.random(0, render.options.width); // on remplace X par un aléatoire

    return Bodies.circle(x, -350, Common.random(10, 20), {
        friction: 0.00001,
        restitution: 0.5,
        density: Matter.Common.random(0.0005, 0.02),
        frictionAir: Matter.Common.random(0.0001, 0.05),
        render: {
            sprite: {
                texture: images[Math.floor(Math.random() * images.length)],
                xScale: 0.1,
                yScale: 0.1
            }
        }
    });
});

    
// create two boxes and a ground
//r boxA = Bodies.rectangle(400, 200, 80, 80);
//r boxB = Bodies.rectangle(450, 50, 80, 80);
//r ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [stack]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
 var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        // keep the mouse in sync with rendering
    render.mouse = mouse;



    Composite.add(world, mouseConstraint);
    
Matter.Events.on(engine, "beforeUpdate", () => {
    const bodies = Matter.Composite.allBodies(engine.world);

    bodies.forEach(body => {
        if (body.position.y > window.innerHeight + 100) {
            Matter.Body.setPosition(body, {
                x: Math.random() * window.innerWidth,
                y: -100
            });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }
    });
});


