# Static Website

## Technologies used:
- HTML
- CSS
- JS
- Docker


## How to run?  
Clone the repository using the below command:
```
git clone https://github.com/mayuresh-tech/static-website-submission.git
```

- Local build using docker image:
    
    ```
    docker load --input form-static-website.tar
	docker run -d -p 8080:80 form-static-website
    ```

    View webiste at http://localhost:8080/  
  
- Remote fetch image from Docker hub:
   
    ```
    docker run -d -p 8080:80 mayuresh14/form-website
    ```

    View webiste at http://localhost:8080/


## Cleanup steps:   
Get the Container Id by running the first command and replace CONTAINER_ID with the ID.

    docker ps
	docker stop CONTAINER_ID
