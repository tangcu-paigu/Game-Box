

       var dir = 99 ;
       var snakeList , foodList , eaten, intervalVar , score , running = false , speed , fps ,counter , level ;  // counter : to regulate speed



       var snakeBody = {                    // Defining the snake body

              height : 15 ,
              width : 15 ,
              color : "green"
       };

       var food = {                          //Defining the food
        color: "orange" 
      
       };

       drawSnake = function(sb , i){         // It takes index of snake body 
         ctx.save() ;

         if(i==0)
         {
            ctx.fillStyle = "red" ;
         }

         else{
            ctx.fillStyle = snakeBody.color ;
            
         }
          ctx.fillRect(sb.x , sb.y , snakeBody.width, snakeBody.height) ;
          ctx.restore() ;

        }

        gameOverMsg = function(){
        	ctx.save() ;

        	ctx.fillStyle = "red" ;
        	ctx.font = "30px calibri";
        	ctx.fillText("GAME OVER..!", 70 , 150);

        	ctx.restore();
        }



        drawFood = function(f , i){

            ctx.save() ;
            ctx.fillStyle = food.color ;
        //  ctx.arc(f.x , f.y , 10 , 0 , 2*Math.PI) ;
        //  ctx.fill() ;
            ctx.fillRect(f.x , f.y , 15 , 15) ;
           ctx.restore() ;
        }

         drawboundary = function(){
         	ctx.save();
         	ctx.style = "black" ;
         	ctx.fillRect(0 , 0 , 7 , 300) ;
         	ctx.fillRect(0 , 0 , 350 , 7) ;
         	ctx.fillRect(343 , 0 , 7 , 300) ;
         	ctx.fillRect(0 , 293, 350 , 7) ;

            ctx.restore();
         }

        document.onkeydown = function(event){

            if(event.keyCode == 37 && dir !=2){
                dir = 0 ;       //left
            }

            else if(event.keyCode == 38 && dir!= 3){
                dir = 1  ;             //up
            }

            else if(event.keyCode == 39 && dir != 0)
                dir = 2 ;              // right

            else if (event.keyCode == 40 && dir != 1) 
                dir = 3     ;          //down
        }


      

        updateSnakeList = function(){

          for(var i= snakeList.length-1 ; i>=0 ; i--)
          {
             if(dir == 0){
             
                if(i==0)
                {
                    snakeList[i].x = snakeList[i].x - 8 - speed ;
                 }

                 else
                 {
                    snakeList[i].x = snakeList[i-1].x ;
                    snakeList[i].y = snakeList[i-1].y
                 }

             }

             else if(dir == 1){

                 if(i==0)
                {
                    snakeList[i].y = snakeList[i].y - 8 - speed;
                 }

                 else
                 {
                    snakeList[i].x = snakeList[i-1].x ;
                    snakeList[i].y = snakeList[i-1].y
                 }

             }

             else if(dir == 2){

                if(i==0)
                {
                    snakeList[i].x = snakeList[i].x + 8 + speed ;
                 }

                 else
                 {
                    snakeList[i].x = snakeList[i-1].x ;
                    snakeList[i].y = snakeList[i-1].y
                 }

             }

             else if(dir == 3){

                 if(i==0)
                {
                    snakeList[i].y = snakeList[i].y + 8 + speed ;
                 }

                 else
                 {
                    snakeList[i].x = snakeList[i-1].x ;
                    snakeList[i].y = snakeList[i-1].y
                 }

             }

           }
        }

         foodAppear = function(){
            while(eaten){
              var x_pos = Math.random()*330 + 5 ;
              var y_pos = Math.random()*280 + 5 ;   
              foodList[0]= {x: x_pos, y:y_pos} ;

              eaten = false ;
            }
         }

        


         incSnakeBody = function(){
             
             var new_x ;
             var new_y ;

             if(dir == 0){
                new_x = snakeList[0].x - 8  ;
                new_y = snakeList[0].y;
             }

           else if(dir == 1){
                new_x = snakeList[0].x  ;
                new_y = snakeList[0].y - 8 ;
             }

            else if(dir == 2){
                new_x = snakeList[0].x + 8 ;
                new_y = snakeList[0].y;
             }

            else if(dir == 3){
                new_x = snakeList[0].x  ;
                new_y = snakeList[0].y + 8 ;
             }
       
            snakeList.unshift({x:new_x , y: new_y}) ;

         }

         collision = function(sl, fl){
               
               if(sl[0].x <= fl[0].x + 15 && fl[0].x <= sl[0].x + 15 && sl[0].y <= fl[0].y + 15 && fl[0].y <= sl[0].y + 15 ){
               	 score++ ;
                 return true ;
               }

               else{
                return false ;
               }
         }

         collisionSnake = function(sl1 , sl2){
         	if(Math.abs(sl1.x - sl2.x)< 5 && Math.abs(sl1.y - sl2.y)< 5){
         		return true;
         	}
         }

        function checkLevel(l1,l2){
         	if(l1 == true){
         		level = 0 ;
         	}

         	else if (l2 == true){
         		level = 1 ;
         	}
         }
         

        

        updateSnakePosition = function(){
            ctx.clearRect(0,0, 350, 300) ;
            snakeList.forEach(drawSnake) ;
            updateSnakeList() ;
            foodAppear();
            foodList.forEach(drawFood);
           
            if(collision(snakeList , foodList)){

                foodList = [] ;
                eaten = true ;
                incSnakeBody() ;
                counter++ ;  
            }

            for(var i= 1 ; i<snakeList.length ; i++){

            	if(collisionSnake(snakeList[0], snakeList[i])){         // IS GAME OVER CONDITION
            		clearInterval(intervalVar);
            		gameOverMsg();
            	}
            }

             if(speed <= 8 && counter > 4){
                    speed = speed +1 ;
                    counter = 0 ;
                 }

             if(level==0){
             	noBoundary();
             }    

             else if(level == 1){
             	drawboundary();
             	boundary();
             }

             checkLevel(l1 , l2) ;

             ctx.font = "14px comic sans MS";
             ctx.fillStyle = "blue" ;
             ctx.fillText("score : "+score, 280 , 20);
            
        }

        noBoundary = function(){
            if(snakeList[0].x < 0){
                snakeList[0].x = 350 ;
            }  

            else if(snakeList[0].x > 350){  
                snakeList[0].x = 0 ;
            }

            else if (snakeList[0].y < 0) {
                snakeList[0].y = 300;        
            }

            else if(snakeList[0].y > 300){
                snakeList[0].y = 0 ;
            }
        }

        boundary = function(){

        	if(snakeList[0].x <= -5){
        		clearInterval(intervalVar);
        		gameOverMsg();                 
        	}

        	else if(snakeList[0].x >= 345){
        		clearInterval(intervalVar) ;
        		gameOverMsg()
        	}

        	else if(snakeList[0].y <= -5){
        		clearInterval(intervalVar);
        		gameOverMsg();
        	}

        	else if(snakeList[0].y >= 295){
        		clearInterval(intervalVar);
        		gameOverMsg();
        	}
        }


     startGame = function(){                 // Initial condition of the game when it starts

          snakeList = [                      // Snake Body Array

              { x:150 , y: 100 },             // index = 2
              { x:160 , y: 100 },            // index = 1
              { x:170 , y: 100 }             // index = 0

          ];

          foodList = [] ;
         dir = 99 ;
         score = 0 ;
         level=0 ;
         eaten = true ;
         running = true ;
         speed = 0 ;
         counter = 0 ;
         intervalVar =  setInterval(updateSnakePosition, 40) ;
     }

    