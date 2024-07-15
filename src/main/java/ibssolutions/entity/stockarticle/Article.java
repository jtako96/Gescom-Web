package ibssolutions.entity.stockarticle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ibssolutions.entity.comptabilite.Compte;

@Entity @Table(name="article_stock")
public class Article implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="reference", length = 101, nullable = false)
	private String reference;
	
	@Column(name="designation", length = 101, nullable = false)
	private String designation;
	
	
	@Column(name="stock", length = 101, nullable = true)
	private int stock;
	
	@Column(name="stock_old", length = 101, nullable = true)
	private int stockOld;
	
	@Column(name="description", length = 255, nullable = false)
	private String description;
	
	@Column(name="prix_unitaire", length = 101, nullable = true)
	private double prixUnitaire;
	
	@ManyToOne
	@JoinColumn(name = "id_compte" , nullable = false)
	private Compte compte;
	
	@ManyToOne
	@JoinColumn(name="id_sous_group", nullable = false)
	private SousGroup sousGroup;
	
	@ManyToOne
	@JoinColumn(name="id_conditionnement", nullable = false)
	private Conditionnement conditionnement;

	public Article() {
		super();
		
	}

	public SousGroup getSousGroup() {
		return sousGroup;
	}

	public void setSousGroup(SousGroup sousGroup) {
		this.sousGroup = sousGroup;
	}

	public Article(Long id) {
		super();
		this.id = id;
	}

	public Article(String reference, String designation, double prixUnitaire, Compte compte) {
		super();
		this.reference = reference;
		this.designation = designation;
		this.prixUnitaire = prixUnitaire;
		this.compte = compte;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public double getPrixUnitaire() {
		return prixUnitaire;
	}

	public void setPrixUnitaire(double prixUnitaire) {
		this.prixUnitaire = prixUnitaire;
	}

	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public Conditionnement getConditionnement() {
		return conditionnement;
	}

	public void setConditionnement(Conditionnement conditionnement) {
		this.conditionnement = conditionnement;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public int getStockOld() {
		return stockOld;
	}

	public void setStockOld(int stockOld) {
		this.stockOld = stockOld;
	}
	
	
	
}
