package com.proyecto.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.proyecto.backend.dto.Iphone15DTO;

@Component("iPhone15ScrapingService")
public class ScrapingService {
    public List<Iphone15DTO> retrieveIPhone15Data() {
        List<Iphone15DTO> iphoneData = new ArrayList<>();

        try {
            Document webPage = Jsoup.connect("https://es.wikipedia.org/wiki/IPhone_15").get();
            Element table = webPage.selectFirst("table.infobox");

            if (table != null) {
                Elements rows = table.select("tr");
                String tipo = "", fabricante = "", pantalla = "", ram = "", procesador = "", colores = "", 
                       fechaLanzamiento = "", peso = "", memoria = "", gpu = "", soc = "", conectividad = "", 
                       audio = "", videocamara = "", videocamaraTrasera = "", bateria = "", sistemaOperativo = "";

                for (Element row : rows) {
                    Elements th = row.select("th");
                    Elements td = row.select("td");

                    if (th.text().contains("Tipo")) {
                        tipo = td.text();
                    } else if (th.text().contains("Fabricante")) {
                        fabricante = td.text();
                    } else if (th.text().contains("Pantalla")) {
                        pantalla = td.text();
                    } else if (th.text().contains("RAM")) {
                        ram = td.text();
                    } else if (th.text().contains("Procesador")) {
                        procesador = td.text();
                    } else if (th.text().contains("Colores")) {
                        colores = td.text();
                    } else if (th.text().contains("Fecha de lanzamiento")) {
                        fechaLanzamiento = td.text();
                    } else if (th.text().contains("Peso")) {
                        peso = td.text();
                    } else if (th.text().contains("Memoria")) {
                        memoria = td.text();
                    } else if (th.text().contains("GPU")) {
                        gpu = td.text();
                    } else if (th.text().contains("SoC")) {
                        soc = td.text();
                    } else if (th.text().contains("Conectividad")) {
                        conectividad = td.text();
                    } else if (th.text().contains("Audio")) {
                        audio = td.text();
                    } else if (th.text().contains("Videocámara")) {
                        videocamara = td.text();
                    } else if (th.text().contains("Videocámara trasera")) {
                        videocamaraTrasera = td.text();
                    } else if (th.text().contains("Batería")) {
                        bateria = td.text();
                    } else if (th.text().contains("Sistema operativo")) {
                        sistemaOperativo = td.text();
                    }
                }

                Iphone15DTO dto = new Iphone15DTO(tipo, fabricante, pantalla, ram, procesador, colores, fechaLanzamiento, 
                                                  peso, memoria, gpu, soc, conectividad, audio, videocamara, videocamaraTrasera, 
                                                  bateria, sistemaOperativo);
                iphoneData.add(dto);
            }

            return iphoneData;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
