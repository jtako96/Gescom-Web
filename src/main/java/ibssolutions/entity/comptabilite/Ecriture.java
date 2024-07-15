package ibssolutions.entity.comptabilite;

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

import ibssolutions.commande.BonLivraison;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Mois;
import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.Prestation;
import ibssolutions.entity.vente.Vente;

@Entity
public class Ecriture implements Serializable{
	
	/**
	 * Mars 2022 debut de gestion des ecritures comptable
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	private String code;
	//Pour signifier que l'ecriture est generer par rapport a une vente en si on la saisi manuellement
	private String generer;
	
	private String intituleEcriture;
	
	@Column(name="date_ecriture", length = 20, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateEcriture;
	
	private double totalDebit;
	
	private boolean etat ;
	
	private double totalCredit;
	
	@ManyToOne
	@JoinColumn(name = "id_type_piece" , nullable = false)
	private TypePiece typePiece;
	
	@ManyToOne
	@JoinColumn(name = "id_mois" , nullable = false)
	private Mois mois;
	
	@ManyToOne
	@JoinColumn(name = "id_exercice" , nullable = false)
	private Exercice exercice;
	
	@ManyToOne
	@JoinColumn(name = "id_vente" , nullable = true)
	private Vente vente;
	
	@ManyToOne
	@JoinColumn(name = "id_bon" , nullable = true)
	private BonLivraison bonLivraison;
	
	@ManyToOne
	@JoinColumn(name = "id_scrussale" , nullable = true)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name = "id_journal" , nullable = true)
	private JournalComptable journalComptable;
	
	@ManyToOne
	@JoinColumn(name = "id_reglement" , nullable = true)
	private Reglement reglement;
	
	@ManyToOne
	@JoinColumn(name = "id_prestation" , nullable = true)
	private Prestation prestation;
	

	public Ecriture() {
		super();
	}

	public Ecriture(String code, Date dateEcriture, double totalDebit, double totalCredit, TypePiece typePiece,
			Mois mois, Exercice exercice, Vente vente) {
		super();
		this.code = code;
		this.dateEcriture = dateEcriture;
		this.totalDebit = totalDebit;
		this.totalCredit = totalCredit;
		this.typePiece = typePiece;
		this.mois = mois;
		this.exercice = exercice;
		this.vente = vente;
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

	public Date getDateEcriture() {
		return dateEcriture;
	}

	public void setDateEcriture(Date dateEcriture) {
		this.dateEcriture = dateEcriture;
	}

	public double getTotalDebit() {
		return totalDebit;
	}

	public void setTotalDebit(double totalDebit) {
		this.totalDebit = totalDebit;
	}

	public double getTotalCredit() {
		return totalCredit;
	}

	public void setTotalCredit(double totalCredit) {
		this.totalCredit = totalCredit;
	}

	public TypePiece getTypePiece() {
		return typePiece;
	}

	public void setTypePiece(TypePiece typePiece) {
		this.typePiece = typePiece;
	}

	public Mois getMois() {
		return mois;
	}

	public void setMois(Mois mois) {
		this.mois = mois;
	}

	public Exercice getExercice() {
		return exercice;
	}

	public void setExercice(Exercice exercice) {
		this.exercice = exercice;
	}

	public Vente getVente() {
		return vente;
	}

	public void setVente(Vente vente) {
		this.vente = vente;
	}

	public String getGenerer() {
		return generer;
	}

	public void setGenerer(String generer) {
		this.generer = generer;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public String getIntituleEcriture() {
		return intituleEcriture;
	}

	public void setIntituleEcriture(String intituleEcriture) {
		this.intituleEcriture = intituleEcriture;
	}

	public JournalComptable getJournalComptable() {
		return journalComptable;
	}

	public void setJournalComptable(JournalComptable journalComptable) {
		this.journalComptable = journalComptable;
	}

	public BonLivraison getBonLivraison() {
		return bonLivraison;
	}

	public void setBonLivraison(BonLivraison bonLivraison) {
		this.bonLivraison = bonLivraison;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	public Reglement getReglement() {
		return reglement;
	}

	public void setReglement(Reglement reglement) {
		this.reglement = reglement;
	}

	public Prestation getPrestation() {
		return prestation;
	}

	public void setPrestation(Prestation prestation) {
		this.prestation = prestation;
	}

	

}
