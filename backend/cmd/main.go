package main

import (
	"log"
	"student-mark-system/config"
	"student-mark-system/handlers"
	
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		
		c.Next()
	})

	api := r.Group("/api")
	{
		students := api.Group("/students")
		{
			students.POST("", handlers.CreateStudent)
			students.GET("", handlers.GetStudents)
			students.GET("/:id", handlers.GetStudent)
			students.PUT("/:id", handlers.UpdateStudent)
			students.DELETE("/:id", handlers.DeleteStudent)
		}
	}

	log.Println("Server starting on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
