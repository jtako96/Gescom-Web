package ibssolutions.entity.parametre;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "societes")
@Entity
public class Societe implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="raison_sociale", length = 101, nullable = false)
	private String raisonSociale;
	
	@Column(name="nom_abrege", length = 101, nullable = false)
	private String nomAbrege;
	
	@Column(name="contact", length = 101, nullable = false)
	private String contact;
	
	@Column(name="email", length = 101, nullable = false)
	private String email;

	@Column(name="adresse", length = 101, nullable = false)
	private String adresse;
	
	
	public Societe() {
		super();
	}


	public Societe(String raisonSociale, String nomAbrege, String contact, String email, String adresse) {
		super();
		this.raisonSociale = raisonSociale;
		this.nomAbrege = nomAbrege;
		this.contact = contact;
		this.email = email;
		this.adresse = adresse;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getRaisonSociale() {
		return raisonSociale;
	}


	public void setRaisonSociale(String raisonSociale) {
		this.raisonSociale = raisonSociale;
	}


	public String getNomAbrege() {
		return nomAbrege;
	}


	public void setNomAbrege(String nomAbrege) {
		this.nomAbrege = nomAbrege;
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


	public String getAdresse() {
		return adresse;
	}


	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	
}
