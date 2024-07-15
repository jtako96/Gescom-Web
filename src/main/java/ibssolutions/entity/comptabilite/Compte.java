package ibssolutions.entity.comptabilite;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity  @Table(name="comptes")
public class Compte implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code")
	private int code;
	
	@Column(name="numero")
	private int numero;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="index_compte")
	private int index;
	
	@Column(name="ordreA")
	private int ordre;
	
	@ManyToOne
	@JoinColumn(name = "id_subdivision" , nullable = false)
	private Subdivision subdivision;
	
	public Compte() {
		super();
	}
	
	public Compte(Long id) {
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

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public Subdivision getSubdivision() {
		return subdivision;
	}

	public void setSubdivision(Subdivision subdivision) {
		this.subdivision = subdivision;
	}

	public int getOrdre() {
		return ordre;
	}

	public void setOrdre(int ordre) {
		this.ordre = ordre;
	}

	
}
