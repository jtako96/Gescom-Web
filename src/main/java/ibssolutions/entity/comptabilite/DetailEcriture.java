package ibssolutions.entity.comptabilite;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class DetailEcriture implements Serializable{

	/**
	 * Mars 2022 debut de gestion des ecritures comptable
	 */
	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	private double montantCredit;
	
	private double montantDebit;
	
	private Date date;
	
	private String libelle;

	private String sens;
	
	@ManyToOne
	@JoinColumn(name = "id_ecriture" , nullable = false)
	private Ecriture ecriture;
	
	@ManyToOne
	@JoinColumn(name = "id_compte" , nullable = true)
	private Compte compte;
	
	@ManyToOne
	@JoinColumn(name = "id_sous_compte" , nullable = true)
	private SousCompte sousCompte;

	public DetailEcriture() {
		super();
	}

	public DetailEcriture(double montantCredit, double montantDebit, Date date, Ecriture ecriture, Compte compte,
			SousCompte sousCompte) {
		super();
		this.montantCredit = montantCredit;
		this.montantDebit = montantDebit;
		this.date = date;
		this.ecriture = ecriture;
		this.compte = compte;
		this.sousCompte = sousCompte;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getMontantCredit() {
		return montantCredit;
	}

	public void setMontantCredit(double montantCredit) {
		this.montantCredit = montantCredit;
	}

	public double getMontantDebit() {
		return montantDebit;
	}

	public void setMontantDebit(double montantDebit) {
		this.montantDebit = montantDebit;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Ecriture getEcriture() {
		return ecriture;
	}

	public void setEcriture(Ecriture ecriture) {
		this.ecriture = ecriture;
	}

	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public SousCompte getSousCompte() {
		return sousCompte;
	}

	public void setSousCompte(SousCompte sousCompte) {
		this.sousCompte = sousCompte;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getSens() {
		return sens;
	}

	public void setSens(String sens) {
		this.sens = sens;
	}
	
	
	
}
