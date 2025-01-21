package com.entity.view;

import com.entity.RemenjingdianEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
 

/**
 * 热门景点
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2022-04-16 20:07:20
 */
@TableName("remenjingdian")
public class RemenjingdianView  extends RemenjingdianEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public RemenjingdianView(){
	}
 
 	public RemenjingdianView(RemenjingdianEntity remenjingdianEntity){
 	try {
			BeanUtils.copyProperties(this, remenjingdianEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}
}
