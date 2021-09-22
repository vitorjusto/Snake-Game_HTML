let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake=[]
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box

}
let comer = false;
let pontos = 0;
let aux=false;
let jogo;
let playing= false;
let ver= "Start";
let speed = 150;
let isPause = false;
snake[0] =  {
                x: 8*box,
                y: 8*box
                
            }

function criarBG()
{
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha()
{
    for(i = 0; i < snake.length; i++)
    {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function iniciarJogo()
{

    if(snake[0].x > 15 * box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 15 * box;
    if(snake[0].y > 15 * box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 15 * box;
    
   

    for(i = 1; i < snake.length; i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {

            alert("game over")
            clearInterval(jogo);
            return;
        }
    }

    criarBG();
    drawFood();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if((snake[0].x != food.x || snake[0].y != food.y))
    {
    snake.pop();
    }else
    {
        aux = true;
        while(aux)
        {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
            for(i = 0; i < snake.length; i++)
            {
                if(food.x == snake[i].x && food.y == snake[i].y)
                {
                    aux = true;
                    break;
                }
                aux = false;
            }


        }
        comer=true;
        aux = false;
        drawFood();

    }
    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);


}

document.addEventListener('keydown', update);

function update (event)
{
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

    if(event.key == "w" && direction != "down") direction = "up";
    if(event.key == "d" && direction != "left") direction = "right";
    if(event.key == "s" && direction != "up") direction = "down";
    if(event.key == "a" && direction != "right") direction = "left";
}

function drawFood()
{
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    if(comer)
    {
        pontos++;
        document.getElementById("pontos").innerHTML = "Score: " + pontos;
        speed -=1;

        
        comer = false;
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, speed);

    }

}

function start()
{

    document.getElementById("game").innerHTML = game;
    jogo = setInterval(iniciarJogo, speed);
}

let game = document.getElementById("game").innerHTML;
document.getElementById("game").innerHTML="<div class='title'>" +
                                            "<h1>SNAKE</h1>" + "<div class='buttons'><button class='button' onclick='start(true)'>Start</button><button class='button'>Options</button></div>" +
                                            "</div>";






