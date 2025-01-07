pipeline {
    agent { label 'JenkinsSlave03' }

    environment {
        DOCKER_CREDENTIALS = credentials('Dockerhub')
    }

    stages {
        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t mohamedessam1911/notes-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t mohamedessam1911/notes-frontend:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push mohamedessam1911/notes-backend:latest'
                sh 'docker push mohamedessam1911/notes-frontend:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
