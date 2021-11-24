FROM internetsystemsconsortium/bind9:9.16

# Update OS and install common DNS tools
RUN apt update
RUN apt install -y nano dnsutils iputils-ping

# Copy configuration files
COPY named.conf.options /etc/bind/
COPY named.conf.local /etc/bind/
ADD zones /etc/bind/zones

# Set working directory to DNS files
WORKDIR /etc/bind