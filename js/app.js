document.addEventListener('DOMContentLoaded',()=>{
    // definicion de variables
    const grid=document.querySelector('.grid');
    const scoreDisplay=document.getElementById('score');
    const width=28;
    let score=0;
    
    //Crear la pizarra
    const layout=[
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,1,
        1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,1,1,1,1,1,2,2,1,1,1,1,1,1,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,
        1,5,4,4,4,0,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,0,4,4,4,5,1,
        1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,3,1,0,0,0,1,0,1,3,0,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0,1,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,
        1,0,1,3,1,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1,1,1,0,1,3,1,0,1,
        1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,
        1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,
        1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    //Leyenda de la pizarra
    // 0->puntos pacman
    // 1->pared
    // 2->guarida de fantasamas
    // 3->bolas de poder
    // 4->vacio
    // 5->portal
    const squares=[];//div de cada capa
    function crearPizarra()
    {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);
            //asignar la capa(layout) a la pizarra
            if(layout[i]===0)
            {
                squares[i].classList.add('puntos-pacman');
            }
            else if(layout[i]===1)
            {
                squares[i].classList.add('pared');
            }
            else if(layout[i]===2)
            {
                squares[i].classList.add('guarida-fantasma');
            }
            else if(layout[i]===3)
            {
                squares[i].classList.add('bola-poder');
            }
            else if(layout[i]===5)
            {
                squares[i].classList.add('portal');
            }
        }
    }
    crearPizarra();
    
    //definicion de las clase fantasma
    class Person{
        constructor(className,startIndex,speed){
            this.className=className;
            this.startIndex=startIndex;
            this.speed=speed;
            this.currentIndex=startIndex;
            this.timerId=NaN;
            
        }

        obtenerCoordenadas()
        {
            return [this.currentIndex%width,Math.floor(this.currentIndex/width)];
        }
        obtenerCoordenadasNuevas(dir)
        {
            return [(this.currentIndex+dir)%width,Math.floor((this.currentIndex+dir)/width)];
        }
    }
    
    class Ghost extends Person{
        constructor(className,startIndex,speed)
        {
            // llamar al constructor de la clase base antes de usar this
            super(className,startIndex,speed);
            this.isScared=false;
        }
    }
    //crear fantasmas
    ghosts=[
        new Ghost('clyde',401,190),
        new Ghost('inky',410,170),
        new Ghost('pinky',457,150),
        new Ghost('blinky',466,210)
    ]
    
    class Pacman extends Person{
        
    }
    // crear pacman
    var pacman=new Pacman('pacman',449,500);

    function moverPacman(e) {
        squares[pacman.currentIndex].classList.remove('pacman');
        squares[pacman.currentIndex].classList.remove('pm-rotate0','pm-rotate90','pm-rotate180','pm-rotate270');
        let dirX=0;
        let dirY=0;
        switch (e.keyCode) {
            case 37:
                if(pacman.currentIndex%width!==0 &&
                    !squares[pacman.currentIndex-1].classList.contains('pared')&&
                    !squares[pacman.currentIndex-1].classList.contains('guarida-fantasma'))
                    {
                        pacman.currentIndex-=1;
                    }
                    if((pacman.currentIndex-1)===448)
                    {
                        pacman.currentIndex=474;
                    }
                    dirX=-1;
                break;
            case 38:
                if(pacman.currentIndex-width>=0 &&
                    !squares[pacman.currentIndex-width].classList.contains('pared')&&
                    !squares[pacman.currentIndex-width].classList.contains('guarida-fantasma'))
                    {
                        pacman.currentIndex-=width;
                    }
                    dirY=+1;
                break;
            case 39:
                if(pacman.currentIndex%width<width-1 &&
                    !squares[pacman.currentIndex+1].classList.contains('pared')&&
                    !squares[pacman.currentIndex+1].classList.contains('guarida-fantasma'))
                    {
                        pacman.currentIndex+=1;
                    }
                    if((pacman.currentIndex+1)===475)
                    {
                        pacman.currentIndex=449;
                    }
                    dirX=1;
                break;
            case 40:
                if(pacman.currentIndex+width<width*width &&
                    !squares[pacman.currentIndex+width].classList.contains('pared')&&
                    !squares[pacman.currentIndex+width].classList.contains('guarida-fantasma'))
                    {
                        pacman.currentIndex+=width;
                    }
                    dirY=-1;
                break;
        }
        squares[pacman.currentIndex].classList.add('pacman');

        switch (dirX) {
            case -1:
                squares[pacman.currentIndex].classList.add('pm-rotate180');
                break;
            case 1:
                squares[pacman.currentIndex].classList.add('pm-rotate0');
                break;
        }
        switch (dirY) {
            case -1:
                squares[pacman.currentIndex].classList.add('pm-rotate90');
                break;
            case 1:
                squares[pacman.currentIndex].classList.add('pm-rotate270');
                break;
        }


        //llamada de funciones realizadas por pacman
        pacmanComePuntos();
        pacmanComeBolasPoder();
        reviserParaGanar();
    }


    //dibujar a pacman
    squares[pacman.currentIndex].classList.add('pacman');

    //dibujar a los fantasmas
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('fantasma');
    });

    //mover pacman
    document.addEventListener('keyup',moverPacman);

    //pacman come puntos
    function pacmanComePuntos()
    {
        if(squares[pacman.currentIndex].classList.contains('puntos-pacman'))
        {
            score++;
            scoreDisplay.innerHTML=score;
            squares[pacman.currentIndex].classList.remove('puntos-pacman');
        }
    }

    //Pacman come bolas de poder
    function pacmanComeBolasPoder(){
        if(squares[pacman.currentIndex].classList.contains('bola-poder'))
        {
            score+=10;
            ghosts.forEach(ghost=>ghost.isScared=true);
            setTimeout(fantasmasDejanGritar,10000);
            squares[pacman.currentIndex].classList.remove('bola-poder');
        }
    }

    // Los fantasmas realizan un grito
    function fantasmasDejanGritar()
    {
        ghosts.forEach(ghost=>ghost.isScared=false);
    }

    //mover a los fantasmas
    ghosts.forEach(ghost=>moverFantasmas(ghost));
    
    
    function moverFantasmas(ghost)
    {
        const directions=[-1,+1,width,-width];
        var direction=directions[Math.floor(Math.random()*directions.length)];
        
        ghost.timerId=setInterval(function(){
            if(!squares[ghost.currentIndex+direction].classList.contains('pared')&&
            !squares[ghost.currentIndex+direction].classList.contains('fantasma'))
            {
                //eliminar la clase fantasma
                squares[ghost.currentIndex].classList.remove(ghost.className,'fantasma','grito-fantasma');
                //Revisar si es un camino cerrado
                const [ghostX,ghostY]=ghost.obtenerCoordenadas();
                const [pacmanX,pacmanY]=pacman.obtenerCoordenadas();
                const [ghostNewX,ghostNewY]=ghost.obtenerCoordenadasNuevas(direction)

                function estaCoordenadaXCerrado()
                {
                    if((ghostNewX-pacmanX)>(ghostX-pacmanX))
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }

                function estaCoordenadaYCerrado()
                {
                    if((ghostNewY-pacmanY)>(ghostY-pacmanY))
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }

                if(estaCoordenadaXCerrado()||estaCoordenadaYCerrado())
                {
                    ghost.currentIndex+=direction;
                    squares[ghost.currentIndex].classList.add(ghost.className,'fantasma','grito-fantasma');
                }
                else
                {
                    direction=directions[Math.floor(Math.random()*directions.length)];
                    squares[ghost.currentIndex].classList.add(ghost.className,'fantasma');
                }
                squares[ghost.currentIndex].classList.add(ghost.className,'fantasma');
            }
            else
            {
                direction=directions[Math.floor(Math.random()*directions.length)];
            }

            //el fantasma esta dando gritos
            if(ghost.isScared)
            {
                squares[ghost.currentIndex].classList.remove(ghost.className,'fantasma','grito-fantasma');
                squares[ghost.currentIndex].classList.add('grito-fantasma','fantasma');
            }

            if(ghost.isScared&&squares[ghost.currentIndex].classList.contains('pacman'))
            {
                squares[ghost.currentIndex].classList.remove(ghost.className,'fantasma','grito-fantasma');
                ghost.currentIndex=ghost.startIndex;
                score+=100;
                squares[ghost.currentIndex].classList.add(ghost.className,'fantasma')
            }

            //detener el juego si pacman es comido por los fantasmas
            if(squares[ghost.currentIndex].classList.contains('pacman'))
            {
                squares[ghost.currentIndex].classList.remove('pacman');
                squares[pacman.currentIndex].classList.remove('pm-rotate0','pm-rotate90','pm-rotate180','pm-rotate270');
                clearInterval(ghost.timerId);
                scoreDisplay.innerHTML='PERDISTE!';
                document.removeEventListener('keyup',moverPacman);
            }
        },ghost.speed);
    }

    function reviserParaGanar()
    {
        if(score>=336)
        {
            ghosts.forEach(ghost=>clearInterval(ghost.timerId));
            document.removeEventListener('keyup',moverPacman);
            scoreDisplay.innerHTML='GANASTES';
        }
    }
});