package ibssolutions.commande;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import ibssolutions.entity.stockarticle.Stock;
import javax.persistence.ManyToOne;

@Entity
public class DetailsInventaire implements Serializable{

	/**
	 *  17/03/2021 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int quantiteInventorie;
	private int qteAvantInventaire;
	private int qteAprestInventaire;
	private boolean etat;
	
	@ManyToOne
	@JoinColumn(name = "id_stock",nullable = false)
	private Stock stock;
	
	@ManyToOne
	@JoinColumn(name = "id_inventaire",nullable = false)
	private Inventaire inventaire;

	public DetailsInventaire() {
		super();
	}

	public DetailsInventaire(Long id) {
		super();
		this.id = id;
	}

	public DetailsInventaire(int quantiteInventorie, int qteAvantInventaire, int qteAprestInventaire, Stock stock,
			Inventaire inventaire) {
		super();
		this.quantiteInventorie = quantiteInventorie;
		this.qteAvantInventaire = qteAvantInventaire;
		this.qteAprestInventaire = qteAprestInventaire;
		this.stock = stock;
		this.inventaire = inventaire;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantiteInventorie() {
		return quantiteInventorie;
	}

	public void setQuantiteInventorie(int quantiteInventorie) {
		this.quantiteInventorie = quantiteInventorie;
	}

	public int getQteAvantInventaire() {
		return qteAvantInventaire;
	}

	public void setQteAvantInventaire(int qteAvantInventaire) {
		this.qteAvantInventaire = qteAvantInventaire;
	}

	public int getQteAprestInventaire() {
		return qteAprestInventaire;
	}

	public void setQteAprestInventaire(int qteAprestInventaire) {
		this.qteAprestInventaire = qteAprestInventaire;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Inventaire getInventaire() {
		return inventaire;
	}

	public void setInventaire(Inventaire inventaire) {
		this.inventaire = inventaire;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}
	
	
}
