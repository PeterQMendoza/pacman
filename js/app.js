document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const scoreDisplay=document.getElementById('score');
    const width=28;//28x28=784;
    let score=0;

    // Capa de grilla y que estan en los cuadrados
    const layout=[
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,0,1,
        1,0,0,0,0,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,0,0,0,0,0,0,1,
        1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,1,
        1,4,4,4,4,0,0,0,4,1,1,1,1,1,1,1,1,4,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
        1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares=[]
    // legend
    // 0->pac-dot
    // 1->wall
    // 2->ghost -lair
    // 3->power-peller
    // 4->empty


    // Dibujar el grid
    function crearPizarra()
    {
        for (let i=0 ; i < layout.length; i++) {
            const square=document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            //agregar layout en el apizarra
            if(layout[i]===0){
                squares[i].classList.add('pac-dot')
            }else if(layout[i]===1){
                squares[i].classList.add('wall')
            }else if(layout[i]===2){
                squares[i].classList.add('ghost-lair')
            }else if(layout[i]===3){
                squares[i].classList.add('power-pellet')
            }
        }
    }

    crearPizarra();

    let pacmanCurrentIndex=450
    squares[pacmanCurrentIndex].classList.add('pac-man');

    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        
        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex%width!==0 && 
                    !squares[pacmanCurrentIndex-1].classList.contains('wall')&&
                    !squares[pacmanCurrentIndex-1].classList.contains('ghost-lair'))
                    {
                        pacmanCurrentIndex-=1;

                    }
                if((pacmanCurrentIndex-1)===448)
                {
                    pacmanCurrentIndex=474;
                }
                break;
            case 38:
                if(pacmanCurrentIndex-width>=0 &&
                    !squares[pacmanCurrentIndex-width].classList.contains('wall')&&
                    !squares[pacmanCurrentIndex-width].classList.contains('ghost-lair'))
                    {
                        pacmanCurrentIndex-=width;
                    }
                break;
            case 39:
                if(pacmanCurrentIndex%width<width-1 &&
                    !squares[pacmanCurrentIndex+1].classList.contains('wall')&&
                    !squares[pacmanCurrentIndex+1].classList.contains('ghost-lair'))
                    {
                        pacmanCurrentIndex+=1;
                    }
                if((pacmanCurrentIndex+1)===475)
                {
                    pacmanCurrentIndex=449;
                }
                break;
            case 40:
                if(pacmanCurrentIndex+width<width*width &&
                    !squares[pacmanCurrentIndex+width].classList.contains('wall')&&
                    !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair'))
                    {
                        pacmanCurrentIndex+=width;
                    }
                break;
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')


        pacmandotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }

    document.addEventListener('keyup',movePacman);


    //que sucede cuando pacman come pac-dot
    function pacmandotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++;
            scoreDisplay.innerHTML=score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
        }
    }

    // Que sucede si pacman come power/pellet
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score+=10;
            ghosts.forEach(ghost=>ghost.isScared=true);
            setTimeout(unScaredGhost,10000);
            squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }

    function unScaredGhost(){
        ghosts.forEach(ghost=>ghost.isScared=false);
    }

    //crear nuestro plantilla ghost
    class Ghost{
        constructor(ClassName,startIndex,speed){
            this.ClassName=ClassName;
            this.startIndex=startIndex;
            this.speed=speed;
            this.currentIndex=startIndex;
            this.timerId=NaN;
            this.isScared=false;
        }
    }

    ghosts=[
        new Ghost('gasparin',375,1300),
        new Ghost('pat',378,850),
        new Ghost('beky',403,500),
        new Ghost('lucky',406,700)
    ]

    //dibujar los fantasmas
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.ClassName);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    // Mover los fantasma de forma aleatoria
    ghosts.forEach(ghost=>moverGhost(ghost));

    //funcion moverghost
    function moverGhost(ghost){
        const directions=[-1,+1,width,-width]
        let direction=directions[Math.floor(Math.random()*directions.length)]

        ghost.timerId=setInterval(function(){
            if(!squares[ghost.currentIndex+direction].classList.contains('wall')&&
                !squares[ghost.currentIndex+direction].classList.contains('ghost')
            )
            {
                // puede ir
                //eliminar todos los fantasmas relacionados a la clase
                squares[ghost.currentIndex].classList.remove(ghost.ClassName,'ghost','scared-ghost')
                // cambiar currentindex a un nuevo cuadrado.
                ghost.currentIndex+=direction;

                //volver a dibujar el fantasma en el nuevo espacio
                squares[ghost.currentIndex].classList.add(ghost.ClassName,'ghost');
            }
            else
            {
                direction=directions[Math.floor(Math.random()*directions.length)]
            }

            //si el fantasma esta dando grito
            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }

            // si el fantasma grita y pacmna corre en el
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man'))
            {
                squares[ghost.currentIndex].classList.remove(ghost.ClassName,'ghost','scared-ghost');
                ghost.currentIndex=ghost.startIndex;
                score+=100;
                squares[ghost.currentIndex].classList.add(ghost.ClassName,'ghost');
            }
            checkForGameOver();
        },ghost.speed);
    }

    // revisar para termnar el juego
    function checkForGameOver()
    {
        if(squares[pacmanCurrentIndex].classList.contains('ghost')&&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost=>clearInterval(ghost.timerId));
            document.removeEventListener('keyup',movePacman);
        //     setTimeout(function(){alert('Game Over!')
        // },500)
        scoreDisplay.innerHTML='GAME OVER';
        }
    }

    // revisar si gano el jueb=go
    function checkForWin()
    {
        if(score===264)
        {
            ghosts.forEach(ghost=>clearInterval(ghost.timerId));
            document.removeEventListener('keyup',movePacman)
            scoreDisplay.innerHTML='YOU WON!';
        }
    }
});