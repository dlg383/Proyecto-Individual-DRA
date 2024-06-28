package com.proyecto.backend.dto;

public class Iphone15DTO {
    public String tipo;
    public String fabricante;
    public String pantalla;
    public String ram;
    public String procesador;
    public String colores;
    public String fechaLanzamiento;
    public String peso;
    public String memoria;
    public String gpu;
    public String soc;
    public String conectividad;
    public String audio;
    public String videocamara;
    public String videocamaraTrasera;
    public String bateria;
    public String sistemaOperativo;

    public Iphone15DTO(String tipo, String fabricante, String pantalla, String ram, String procesador, String colores, String fechaLanzamiento, String peso, String memoria, String gpu, String soc, String conectividad, String audio, String videocamara, String videocamaraTrasera, String bateria, String sistemaOperativo) {
        this.tipo = tipo;
        this.fabricante = fabricante;
        this.pantalla = pantalla;
        this.ram = ram;
        this.procesador = procesador;
        this.colores = colores;
        this.fechaLanzamiento = fechaLanzamiento;
        this.peso = peso;
        this.memoria = memoria;
        this.gpu = gpu;
        this.soc = soc;
        this.conectividad = conectividad;
        this.audio = audio;
        this.videocamara = videocamara;
        this.videocamaraTrasera = videocamaraTrasera;
        this.bateria = bateria;
        this.sistemaOperativo = sistemaOperativo;
    }
}
