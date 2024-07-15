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


@Entity  @Table(name="sous_compte")
public class SousCompte implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code_compte")
	private int code;
	
	@Column(name="numero_compte")
	private int numero;
	
	//A = Article, F = Fournisseur, V = Vente
	@Column(name="statut_compte", length = 101, nullable = false)
	private String statut;
	
	private Long idStatut;
	
	@Column(name="libelle_compte", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="index_compte")
	private int index;
	
	@ManyToOne
	@JoinColumn(name = "id_compte" , nullable = false)
	private Compte compte;
	
	public SousCompte(int code, int numero, String statut, Long idStatut, String libelle, int index, Compte compte) {
		super();
		this.code = code;
		this.numero = numero;
		this.statut = statut;
		this.idStatut = idStatut;
		this.libelle = libelle;
		this.index = index;
		this.compte = compte;
	}

	public SousCompte() {
		super();
	}
	
	public SousCompte(Long id) {
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

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Long getIdStatut() {
		return idStatut;
	}

	public void setIdStatut(Long idStatut) {
		this.idStatut = idStatut;
	}

	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	
}
