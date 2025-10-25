terraform {
  backend "s3" {
    bucket         = "bucketayd2"
    key            = "terraform/state.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}


provider "aws" {
  region = "us-east-1"
}



resource "aws_security_group" "web-sg" {
  name        = "web-sg"
  description = "Allow HTTP traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0dba2cb6798deb6d8"
  instance_type = "t2.micro"
  key_name      = "claves-ayd2"
  security_groups = [aws_security_group.web-sg.name]
  
  tags = {
    Name = "docker-ec2-instance"
  }

}

output "public_ip" {
  value = aws_instance.web.public_ip
}