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

@Table(name = "entree_stockIBSS", uniqueConstraints = {@UniqueConstraint(columnNames =  {"code"})})
@Entity
public class EntreeStock implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code", length = 101, nullable = true)
	private String code;
	
	@Column(name="date", length = 101, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date date;

	@Column(name="etat", length = 1, nullable = true)
	private boolean etat;
	
	@ManyToOne
	@JoinColumn(name = "id_fournisseur", nullable = false)
	private Fournisseur fournisseur;
	
	
	@ManyToOne
	@JoinColumn(name = "id_exercice", nullable = false)
	private Exercice exercice;

	public Long getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public Exercice getExercice() {
		return exercice;
	}

	public void setExercice(Exercice exercice) {
		this.exercice = exercice;
	}

	public void setId(Long id) {
		this.id = id;
	}



	
}
