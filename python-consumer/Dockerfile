# Use the official Python image
FROM python:3.11

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Start the consumer
CMD ["python", "consumer.py"]
