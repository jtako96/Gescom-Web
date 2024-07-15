package ibssolutions.entity.parametre;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


@Table(name = "users")
@Entity
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String username;
	
	@Column(name="mot_de_passe", length = 101, nullable = false)
	private String password;
	
	@Column(name="nom_complet", length = 101, nullable = false)
	private String nomComplet;
	
	@Column(name="photo", length = 101, nullable = true)
	private String photo;
	
	@Column(name="id_scrussale", length = 101, nullable = true)
	private long idScrussale;
	
	@Column(name="etat", length = 101, nullable = false)
	private boolean etat;
	
	@ManyToMany
	@JoinTable(name="user_role")
	private List<Role> roles;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNomComplet() {
		return nomComplet;
	}

	public void setNomComplet(String nomComplet) {
		this.nomComplet = nomComplet;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public long getIdScrussale() {
		return idScrussale;
	}

	public void setIdScrussale(long idScrussale) {
		this.idScrussale = idScrussale;
	}
	
}
