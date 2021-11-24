$TTL    604800
@       IN      SOA     ns1.carlosgs.es. root.carlosgs.es. (
                  3       ; Serial
             604800     ; Refresh
              86400     ; Retry
            2419200     ; Expire
             604800 )   ; Negative Cache TTL
;
; name servers - NS records
     IN      NS      ns1.carlosgs.es.

; name servers - A records
ns1.carlosgs.es.           IN      A      172.21.0.2

nginx1        IN      A      172.21.0.3
nginx2        IN      A      172.21.0.4