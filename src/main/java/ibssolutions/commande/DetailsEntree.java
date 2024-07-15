package ibssolutions.commande;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ibssolutions.entity.stockarticle.Article;


@Entity
public class DetailsEntree implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="prix_unitaire", length = 101, nullable = true)
	private Integer prixUnitaire;
	
	@Column(name="qte_entree", length = 101, nullable = true)
	private double qteEntree;
	
	@ManyToOne
	@JoinColumn(name = "id_article", nullable = false)
	private Article article;

	@Column(name="etat", length = 1, nullable = true)
	private boolean etat;
	
	@Column(name = "actualiser", length = 2, nullable = false)
	private boolean actualiser;
	
	@ManyToOne
	@JoinColumn(name = "id_entree_stock ", nullable = false)
	private EntreeStock entreeStock;

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getPrixUnitaire() {
		return prixUnitaire;
	}

	public void setPrixUnitaire(Integer prixUnitaire) {
		this.prixUnitaire = prixUnitaire;
	}

	public double getQteEntree() {
		return qteEntree;
	}

	public void setQteEntree(double qteEntree) {
		this.qteEntree = qteEntree;
	}


	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public EntreeStock getEntreeStock() {
		return entreeStock;
	}

	public void setEntreeStock(EntreeStock entreeStock) {
		this.entreeStock = entreeStock;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public boolean isActualiser() {
		return actualiser;
	}

	public void setActualiser(boolean actualiser) {
		this.actualiser = actualiser;
	}


}
