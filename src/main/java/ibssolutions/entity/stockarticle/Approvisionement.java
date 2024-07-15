package ibssolutions.entity.stockarticle;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Scrussale;

@Entity
public class Approvisionement implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int quantiteAvant;
	
	private int quantiteApres;
	
	private int quantiteEntree;

	@Column(name="source", length = 101, nullable = false)
	private String source;
	
	@ManyToOne
	@JoinColumn(name="id_scrussale", nullable = false)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name="id_stock", nullable = false)
	private Stock stock;
	
	@ManyToOne
	@JoinColumn(name="id_exercice", nullable = false)
	private Exercice exercice;
	
	@Column(name="date_aprov", length = 20, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateAprov;

	public Approvisionement() {
		super();
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantiteAvant() {
		return quantiteAvant;
	}

	public void setQuantiteAvant(int quantiteAvant) {
		this.quantiteAvant = quantiteAvant;
	}

	public int getQuantiteApres() {
		return quantiteApres;
	}

	public void setQuantiteApres(int quantiteApres) {
		this.quantiteApres = quantiteApres;
	}

	public int getQuantiteEntree() {
		return quantiteEntree;
	}

	public void setQuantiteEntree(int quantiteEntree) {
		this.quantiteEntree = quantiteEntree;
	}

	
	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Exercice getExercice() {
		return exercice;
	}

	public void setExercice(Exercice exercice) {
		this.exercice = exercice;
	}

	public Date getDateAprov() {
		return dateAprov;
	}

	public void setDateAprov(Date dateAprov) {
		this.dateAprov = dateAprov;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
	
	
}
