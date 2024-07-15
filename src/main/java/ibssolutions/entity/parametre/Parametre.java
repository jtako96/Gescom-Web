package ibssolutions.entity.parametre;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


@Table(name = "parametre", uniqueConstraints = {@UniqueConstraint(columnNames =  {"libelle"})})
@Entity
public class Parametre implements Serializable {


	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="valeur", length = 101, nullable = false)
	private Integer valeur;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle =  libelle;
	}

	public int getValeur() {
		return valeur;
	}

	public void setValeur(Integer valeur) {
		this.valeur = valeur;
	}
	

}
