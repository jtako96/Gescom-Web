package ibssolutions.entity.comptabilite;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity @Table(name="classes")
public class Classe implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code", length = 101, nullable = false)
	private String code;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="ordre")
	private int ordre;

	public Classe() {
		super();
	}

	public Classe(Long id) {
		super();
		this.id = id;
	}

	public Classe(String libelle) {
		super();
		this.libelle = libelle;
	}

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
		this.libelle = libelle;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getOrdre() {
		return ordre;
	}

	public void setOrdre(int ordre) {
		this.ordre = ordre;
	}

	
	
	
}
