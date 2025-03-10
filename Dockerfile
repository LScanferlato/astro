# Usa l'immagine ufficiale leggera di Nginx
FROM nginx:alpine

# Rimuove il file di default di Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configurazione personalizzata di Nginx
COPY nginx.conf /etc/nginx/conf.d

# Crea la directory per i contenuti statici
RUN mkdir -p /usr/share/nginx/html

# Copia la pagina HTML e gli assets
COPY index.html /usr/share/nginx/html/

# Espone la porta 80 (HTTP)
EXPOSE 80

# Avvia Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]