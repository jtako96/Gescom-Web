package ibssolutions.commande;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Mois;
import ibssolutions.entity.parametre.Scrussale;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "id_scrussale","id_mois","id_exercice"}) })
public class Inventaire implements Serializable{

	/**
	 * 05/04/2022
	 */
	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="numero_inventaire", length = 20, nullable = true)
	private String code;
	
	private String username;
	
	@Column(name="date_livraison", length = 20, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date dateInventaire;
	
	@Column(name="etat", length = 1, nullable = false)
	private boolean etat;
	
	@ManyToOne
	@JoinColumn(name = "id_scrussale",nullable = false)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name = "id_exercice",nullable = false)
	private Exercice exercice;
	
	@ManyToOne
	@JoinColumn(name = "id_mois",nullable = false)
	private Mois mois;

	public Inventaire() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getDateInventaire() {
		return dateInventaire;
	}

	public void setDateInventaire(Date dateInventaire) {
		this.dateInventaire = dateInventaire;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	public Exercice getExercice() {
		return exercice;
	}

	public void setExercice(Exercice exercice) {
		this.exercice = exercice;
	}

	public Mois getMois() {
		return mois;
	}

	public void setMois(Mois mois) {
		this.mois = mois;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}
	
	
}
