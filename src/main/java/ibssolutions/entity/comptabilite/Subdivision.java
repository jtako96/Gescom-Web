package ibssolutions.entity.comptabilite;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Subdivision implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code")
	private int code;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="numero")
	private int numero;
	
	@Column(name="index_subdivision")
	private int index;
	
	@Column(name="ordre")
	private int ordre;
	
	@ManyToOne
	@JoinColumn(name = "id_sous_classe" , nullable = false)
	private SousClasse sousClasse;
	
	public Subdivision() {
		super();
	}

	public Subdivision(Long id) {
		super();
		this.id = id;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public SousClasse getSousClasse() {
		return sousClasse;
	}

	public void setSousClasse(SousClasse sousClasse) {
		this.sousClasse = sousClasse;
	}

	public int getOrdre() {
		return ordre;
	}

	public void setOrdre(int ordre) {
		this.ordre = ordre;
	}

	
	
	
}
