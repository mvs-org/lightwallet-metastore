FROM library/node

# Set the work directory
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Add package.json and install dependencies
COPY package.json ./
RUN npm i --production

# Add application files
COPY . /var/www/app

EXPOSE 8090

CMD ["sh", "-c", "node index.js"]
