package ibssolutions.entity.clientelle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity @Table(name="gestionnaire")
public class Gestionnaire implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@Column(name="nom", length = 101, nullable = false)
	private String nom;
	
	@Column(name="contact", length = 101, nullable = false)
	private String contact;
	
	@Column(name="email", length = 101, nullable = true)
	private String email;

	public Gestionnaire() {
		super();
	}

	public Gestionnaire(String nom, String contact, String email) {
		super();
		this.nom = nom;
		this.contact = contact;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	
}
