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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.Vente;

@Entity
public class BonLivraison implements Serializable{

	/**
	 *  17/03/2021 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="numero", length = 101, nullable = false)
	private String numero;
	
	@Column(name="etat_bordereaux", length = 1, nullable = false)
	private boolean etatBordereaux;
	
	@Column(name="date_livraison", length = 20, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date dateLivraison;
	
	@Column(name="adresse_ivraison", length = 101, nullable = true)
	private String adresseLivraison;
	
	@Column(name="garantie", length = 101, nullable = true)
	private String garantie;
	
	@Column(name="observation", length = 101, nullable = true)
	private String observation;
	
	// False : ecriture non genere True :ecriture generer
	@Column(name="etat", nullable = false)
    private boolean etat;
	
	@ManyToOne
	@JoinColumn(name = "id_vente" , nullable = true)
	private Vente vente;
	
	@ManyToOne
	@JoinColumn(name = "id_scrussale" , nullable = true)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name = "id_exercice" , nullable = false)
	private Exercice exercice;

	public BonLivraison() {
		super();
	}

	public BonLivraison(String numero, Date dateLivraison, String adresseLivraison, String garantie, String observation,
			Vente vente) {
		super();
		this.numero = numero;
		this.dateLivraison = dateLivraison;
		this.adresseLivraison = adresseLivraison;
		this.garantie = garantie;
		this.observation = observation;
		this.vente = vente;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Date getDateLivraison() {
		return dateLivraison;
	}

	public void setDateLivraison(Date dateLivraison) {
		this.dateLivraison = dateLivraison;
	}

	public String getAdresseLivraison() {
		return adresseLivraison;
	}

	public void setAdresseLivraison(String adresseLivraison) {
		this.adresseLivraison = adresseLivraison;
	}

	public String getGarantie() {
		return garantie;
	}

	public void setGarantie(String garantie) {
		this.garantie = garantie;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public Vente getVente() {
		return vente;
	}

	public void setVente(Vente vente) {
		this.vente = vente;
	}

	public boolean isEtatBordereaux() {
		return etatBordereaux;
	}

	public void setEtatBordereaux(boolean etatBordereaux) {
		this.etatBordereaux = etatBordereaux;
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
	
	
}
