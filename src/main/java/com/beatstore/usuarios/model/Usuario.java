package com.beatstore.usuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datos básicos
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apodo es obligatorio")
    private String apodo;

    // Identificación
    @NotBlank(message = "El RUT es obligatorio")
    private String rut;

    // Contacto
    @NotBlank(message = "El teléfono es obligatorio")
    private String telefono;

    @Email(message = "El correo no es válido")
    @NotBlank(message = "El correo es obligatorio")
    private String email;

    // Dirección
    @NotBlank(message = "La región es obligatoria")
    private String region;

    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;

    @NotBlank(message = "La calle es obligatoria")
    private String calle;

    @NotBlank(message = "El número de dirección es obligatorio")
    private String numeroDireccion;

    // Seguridad
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
}
