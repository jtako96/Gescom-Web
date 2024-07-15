package ibssolutions.entity.stockarticle;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ibssolutions.entity.parametre.Magasin;
import ibssolutions.entity.parametre.Scrussale;

@Entity
public class Stock implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int quantiteReel;
	
	private int quantiteLogique;
	
	private int quantiteInitiale;
	
	@ManyToOne
	@JoinColumn(name="id_scrussale", nullable = false)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name="id_magasin", nullable = false)
	private Magasin magasin;
	
	@ManyToOne
	@JoinColumn(name="id_article", nullable = false)
	private Article article;

	public Stock() {
		super();
	}

	public Stock(int quantiteReel, int quantiteLogique, int quantiteInitiale, Scrussale scrussale, Article article) {
		super();
		this.quantiteReel = quantiteReel;
		this.quantiteLogique = quantiteLogique;
		this.quantiteInitiale = quantiteInitiale;
		this.scrussale = scrussale;
		this.article = article;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantiteReel() {
		return quantiteReel;
	}

	public void setQuantiteReel(int quantiteReel) {
		this.quantiteReel = quantiteReel;
	}

	public int getQuantiteLogique() {
		return quantiteLogique;
	}

	public void setQuantiteLogique(int quantiteLogique) {
		this.quantiteLogique = quantiteLogique;
	}

	public int getQuantiteInitiale() {
		return quantiteInitiale;
	}

	public void setQuantiteInitiale(int quantiteInitiale) {
		this.quantiteInitiale = quantiteInitiale;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public Magasin getMagasin() {
		return magasin;
	}

	public void setMagasin(Magasin magasin) {
		this.magasin = magasin;
	}
	
	
	
}
