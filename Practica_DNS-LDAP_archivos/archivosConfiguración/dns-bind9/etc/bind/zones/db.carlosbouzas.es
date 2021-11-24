$TTL    604800
@       IN      SOA     ns1.carlosbouzas.es. root.carlosbouzas.es. (
    3       ; Serial
604800     ; Refresh
86400     ; Retry
2419200     ; Expire
604800 )   ; Negative Cache TTL
; name servers - NS records
IN      NS      ns1.carlosbouzas.es.

; name servers - A records
apache1        IN      A      172.21.0.3
apache2        IN      A      172.21.0.4