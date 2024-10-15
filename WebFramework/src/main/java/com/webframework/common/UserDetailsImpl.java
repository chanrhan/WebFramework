package com.webframework.common;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Delegate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class UserDetailsImpl implements UserDetails {
	private String username; // 아이디
	private String password; // 비밀번호

	@Delegate
	private List<GrantedAuthority> authorities = new ArrayList<>();

	public UserDetailsImpl(String username, String password){
		this.username=username;
		this.password=password;
	}

	@Builder
	public UserDetailsImpl(String username, String password, String role){
		this.username=username;
		this.password=password;
		if(role == null || role.equals("")){
			return;
		}
		this.authorities.add(new SimpleGrantedAuthority(role));
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
